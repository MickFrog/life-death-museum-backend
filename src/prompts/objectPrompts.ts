/**
 * Object generation prompts
 * These prompts are used for AI text and image generation
 */

export const ObjectPrompts = {
  /**
   * Generate a follow-up question based on user's Q&A content
   */
  generateFollowUpQuestion: (content: string): string => {
    return `사용자가 다음과 같은 질문과 답변을 제공했습니다:

"${content}"

이 질문과 답변을 바탕으로, 더 깊이 있는 오브젝트 생성을 위한 추가 질문(Follow-up Question)을 하나 생성해주세요. 질문만 반환해주세요.`;
  },

  /**
   * Generate object name, description, and onType together based on Q&A content
   * Returns JSON format: { name: string, description: string, onType: "LeftWall" | "RightWall" | "Floor" }
   */
  generateObjectMetadata: (content: string): string => {
    return `다음 질문과 답변을 바탕으로 오브젝트의 메타데이터를 생성해주세요:

"${content}"

다음 JSON 형식으로만 반환해주세요 (다른 텍스트 없이):
{
  "name": "오브젝트 이름",
  "description": "오브젝트 설명",
  "onType": "LeftWall" | "RightWall" | "Floor"
}

onType은 다음 중 하나여야 합니다:
- "LeftWall": 왼쪽 벽에 배치되는 오브젝트
- "RightWall": 오른쪽 벽에 배치되는 오브젝트
- "Floor": 바닥에 배치되는 오브젝트

JSON만 반환해주세요.`;
  },

  /**
   * Generate image prompt based on object metadata
   */
  generateImagePrompt: (
    content: string,
    name: string,
    description: string,
    onType: string
  ): string => {
    return `다음 정보를 바탕으로 이미지를 생성하기 위한 프롬프트를 작성해주세요:

원본 질문과 답변:
"${content}"

오브젝트 이름: ${name}
오브젝트 설명: ${description}
배치 위치: ${onType}

이 정보를 바탕으로 이미지 생성 프롬프트를 작성해주세요. 프롬프트만 반환해주세요.`;
  },
};
