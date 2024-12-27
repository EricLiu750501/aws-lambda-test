import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

// 初始化 AWS Lambda 客戶端
const client = new LambdaClient({ region: "ap-southeast-2" }); // 替換為你的 AWS 區域

// 定義傳遞給 Lambda 的資料
const payload = [ 
    {"from": 0, "to": 1, "amount": 10},
    {"from": 1, "to": 2, "amount": 20},
    {"from": 2, "to": 3, "amount": 30},
    {"from": 3, "to": 0, "amount": 10},
    {"from": 0, "to": 2, "amount": 20},
    {"from": 1, "to": 3, "amount": 30}
  ];

// 定義 Lambda 函數名稱
const functionName = "splitBillGreedy"; // 替換為你的 Lambda 函數名稱

// 呼叫 Lambda 函數
async function invokeLambda() {
  try {
    const command = new InvokeCommand({
      FunctionName: functionName,
      Payload: JSON.stringify(payload),
    });

    const response = await client.send(command);
    const result = JSON.parse(new TextDecoder("utf-8").decode(response.Payload));

    console.log("Lambda response:", result);
  } catch (error) {
    console.error("Error invoking Lambda:", error);
  }
}

// 執行函數
invokeLambda();



