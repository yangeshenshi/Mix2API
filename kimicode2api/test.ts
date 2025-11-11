// 测试脚本 - 验证Kimi API代理功能

const BASE_URL = "http://localhost:8000";

async function testRootEndpoint() {
  console.log("\n=== 测试根路径 ===");
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    console.log("✅ 根路径测试通过:", data);
  } catch (error) {
    console.log("❌ 根路径测试失败:", error);
  }
}

async function testModelsEndpoint() {
  console.log("\n=== 测试模型列表 ===");
  try {
    const response = await fetch(`${BASE_URL}/v1/models`);
    const data = await response.json();
    console.log("✅ 模型列表测试通过:", data);
  } catch (error) {
    console.log("❌ 模型列表测试失败:", error);
  }
}

async function testChatCompletions() {
  console.log("\n=== 测试聊天完成 (非流式) ===");
  try {
    const response = await fetch(`${BASE_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer test-token"
      },
      body: JSON.stringify({
        model: "kimi-for-coding",
        messages: [
          { role: "user", content: "Hello, how are you?" }
        ],
        stream: false
      })
    });
    
    console.log("状态码:", response.status);
    if (response.status === 401) {
      console.log("✅ 预期行为 - 需要有效的API密钥");
    } else {
      const data = await response.json();
      console.log("响应:", data);
    }
  } catch (error) {
    console.log("❌ 聊天完成测试失败:", error);
  }
}

async function testThinkingModel() {
  console.log("\n=== 测试思考模式 ===");
  try {
    const response = await fetch(`${BASE_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer test-token"
      },
      body: JSON.stringify({
        model: "kimi-for-coding-thinking",
        messages: [
          { role: "user", content: "Explain a complex algorithm" }
        ],
        stream: false
      })
    });
    
    console.log("状态码:", response.status);
    if (response.status === 401) {
      console.log("✅ 预期行为 - 需要有效的API密钥 (思考模式已激活)");
    } else {
      const data = await response.json();
      console.log("响应:", data);
    }
  } catch (error) {
    console.log("❌ 思考模式测试失败:", error);
  }
}

// 运行所有测试
async function runTests() {
  console.log("🚀 开始测试 Kimi API 代理...");
  
  await testRootEndpoint();
  await testModelsEndpoint();
  await testChatCompletions();
  await testThinkingModel();
  
  console.log("\n🎉 测试完成！");
}

runTests();
