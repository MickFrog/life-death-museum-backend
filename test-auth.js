#!/usr/bin/env node

/**
 * Authentication API Test Script
 * This script demonstrates the complete authentication flow
 */

const https = require("https");
const http = require("http");

const BASE_URL = "http://localhost:3000";

// Helper function to make HTTP requests
function makeRequest(method, path, data = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "localhost",
      port: 3000,
      path: path,
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    const req = http.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          const response = JSON.parse(body);
          resolve({ status: res.statusCode, data: response });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on("error", reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function testAuthFlow() {
  console.log("🚀 Starting Authentication API Tests\n");

  // Test data
  const testUser = {
    name: "Test User",
    email: "test@example.com",
    password: "testpassword123",
  };

  let authToken = null;

  try {
    // 1. Test Health Check
    console.log("1. Testing Health Check...");
    const healthResponse = await makeRequest("GET", "/health");
    console.log(`   Status: ${healthResponse.status}`);
    console.log(`   Response: ${JSON.stringify(healthResponse.data, null, 2)}`);
    console.log();

    // 2. Test Signup
    console.log("2. Testing User Signup...");
    const signupResponse = await makeRequest("POST", "/auth/signup", testUser);
    console.log(`   Status: ${signupResponse.status}`);
    console.log(`   Response: ${JSON.stringify(signupResponse.data, null, 2)}`);

    if (signupResponse.status === 201 && signupResponse.data.token) {
      authToken = signupResponse.data.token;
      console.log("   ✅ Signup successful! Token received.");
    } else if (signupResponse.status === 409) {
      console.log("   ℹ️ User already exists, proceeding to login...");
    }
    console.log();

    // 3. Test Login
    console.log("3. Testing User Login...");
    const loginResponse = await makeRequest("POST", "/auth/login", {
      email: testUser.email,
      password: testUser.password,
    });
    console.log(`   Status: ${loginResponse.status}`);
    console.log(`   Response: ${JSON.stringify(loginResponse.data, null, 2)}`);

    if (loginResponse.status === 200 && loginResponse.data.token) {
      authToken = loginResponse.data.token;
      console.log("   ✅ Login successful! Token received.");
    }
    console.log();

    // 4. Test Token Verification
    if (authToken) {
      console.log("4. Testing Token Verification...");
      const verifyResponse = await makeRequest("GET", "/auth/verify", null, {
        Authorization: `Bearer ${authToken}`,
      });
      console.log(`   Status: ${verifyResponse.status}`);
      console.log(
        `   Response: ${JSON.stringify(verifyResponse.data, null, 2)}`
      );
      console.log();

      // 5. Test Protected Profile Route
      console.log("5. Testing Protected Profile Route...");
      const profileResponse = await makeRequest("GET", "/auth/profile", null, {
        Authorization: `Bearer ${authToken}`,
      });
      console.log(`   Status: ${profileResponse.status}`);
      console.log(
        `   Response: ${JSON.stringify(profileResponse.data, null, 2)}`
      );
      console.log();
    }

    // 6. Test Accessing Protected Route Without Token
    console.log("6. Testing Protected Route Without Token...");
    const unauthorizedResponse = await makeRequest("GET", "/auth/profile");
    console.log(`   Status: ${unauthorizedResponse.status}`);
    console.log(
      `   Response: ${JSON.stringify(unauthorizedResponse.data, null, 2)}`
    );
    console.log();

    // 7. Test Invalid Login
    console.log("7. Testing Invalid Login...");
    const invalidLoginResponse = await makeRequest("POST", "/auth/login", {
      email: testUser.email,
      password: "wrongpassword",
    });
    console.log(`   Status: ${invalidLoginResponse.status}`);
    console.log(
      `   Response: ${JSON.stringify(invalidLoginResponse.data, null, 2)}`
    );
    console.log();

    console.log("🎉 Authentication API Tests Completed!");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

// Run the test
testAuthFlow();
