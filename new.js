import fs from "fs";
import { v4 } from "uuid";

import dotenv from "dotenv";
dotenv.config()

// const parent_json_file_name = process.env.PARENT_JSON_FILE_NAME;
const questions_response_path = "./new.json" 
const final_responses_path = "./output1.json";

const readFileAsync = async (file, options) =>
  await new Promise((resolve, reject) => {
    fs.readFile(file, options, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  }
);

async function getPromptResponses() {
    try {
      const questions_prompts = await readFileAsync(questions_response_path, "utf8");
      const questions_prompts_json = JSON.parse(questions_prompts);
      return questions_prompts_json;
    } catch (error) {
      console.error("Error reading question prompts:", error);
      throw error;
    }
}

const difficulty_level = {
  "0" : "EASY",
  "1" : "MEDIUM",
  "2" : "HARD"
}

const extractQuestionsData = (prompt_responses) => {

    let final_json_sheet = [];
    
   prompt_responses.forEach(prompt_response => {
        const topic_difficulty_level = prompt_response["difficulty_level"];
        // const startIndex = prompt_responses["prompt_response"].indexOf("[");
        // const endIndex = prompt_responses["prompt_response"].lastIndexOf("]");
        // const prompt_response_json = JSON.parse(prompt_response["prompt_response"].slice(startIndex, endIndex+1));
        //const topicTag = "TOPIC_PEGA_MCQ";
        //const sourceTag = "SOURCE_CHATGPT";
        //const subTopicTag = "SUB_TOPIC_PEGA_DECISIONING"; 
        //let resources = {
          //"resource_name": "CHAT_GPT", 
          //"resource_url": "https://chatgpt.com/share/969939df-2714-4fc4-a8a4-4216e59550e4"
        //}; 

        //prompt_response_json.forEach(response => {
            let question_data = {};
            //let defaultTagNames = ["POOL_1"];
            const blooms_difficulty_level = prompt_response["difficulty_level"];
            const question_difficulty_level = Math.max(topic_difficulty_level, blooms_difficulty_level);
            //defaultTagNames.push(topicTag);
            //defaultTagNames.push(subTopicTag);
            question_data["difficulty"]=("DIFFICULTY_" + difficulty_level[question_difficulty_level]);
            //defaultTagNames.push(sourceTag); 
           
            //question_data["question_id"] = v4();
            // defaultTagNames.push(question_data["question_id"]);  
            // defaultTagNames.push("IN_OFFLINE_EXAM");  
            // defaultTagNames.push("COMPANY_UNKNOWN")
            // question_data["question_type"] = "MULTIPLE_CHOICE";
            question_data["question_content"] = prompt_response["question_text"];
            question_data["code_data"]=prompt_response["code_data"];
            // question_data["short_text"] = "";
            // question_data["multimedia_count"] = 0;
            // question_data["multimedia_format"] = "";
            // question_data["multimedia_url"] = "";
            // question_data["thumbnail_url"] = "";
            // question_data["Language"] = "ENGLISH";
            // question_data["answer_count"] = 4;
            // question_data["content_type"] = "TEXT";
            // question_data["tag_name_count"] = 8;
            // question_data["tag_names"] = "";
            question_data["answer_explanation_content"] = prompt_response["answer_explanation_content"];
            // question_data["explanation_content_type"] = "TEXT";
            // question_data["resource_name"] = resources["resource_name"];
            // question_data["resource_url"] = resources["resource_url"];
            // console.log(question_data["question_content"], topic_difficulty_level, blooms_difficulty_level, question_difficulty_level, defaultTagNames);
            final_json_sheet.push(question_data);

            // for (let i=0; i<8; i++) {
            //     let tags_data = {};
            //     tags_data["question_id"] = "";
            //     tags_data["question_type"] = "";
            //     tags_data["question_content"] = "";
            //     tags_data["short_text"] = "";
            //     tags_data["multimedia_count"] = "";
            //     tags_data["multimedia_format"] = "";
            //     tags_data["multimedia_url"] = "";
            //     tags_data["thumbnail_url"] = "";
            //     tags_data["Language"] = "";
            //     tags_data["answer_count"] = "";
            //     tags_data["content_type"] = "";
            //     tags_data["tag_name_count"] = "";
            //     tags_data["tag_names"] = defaultTagNames[i];  
            //     tags_data["answer_explanation_content"] = "";
            //     tags_data["explanation_content_type"] = "";
            //     tags_data["resource_name"] = ""
            //     tags_data["resource_url"] = ""
            //     final_json_sheet.push(tags_data);
            // }

            for (let i=0; i<4; i++) {
                let options_data = {};
                let option = Object.keys(prompt_response["options"])[i];
                let option_status = prompt_response["options"][Object.keys(prompt_response["options"])[i]];
                // options_data["question_id"] = v4();
                // options_data["question_type"] = "";
                options_data["question_content"] = option;
                // options_data["short_text"] = "";
                // options_data["multimedia_count"] = 0;
                // options_data["multimedia_format"] = "";
                // options_data["multimedia_url"] = "";
                // options_data["thumbnail_url"] = "";
                // options_data["Language"] = "ENGLISH";
                options_data["answer_count"] = option_status;
                // options_data["content_type"] = "TEXT";
                // options_data["tag_name_count"] = "";
                // options_data["tag_names"] = "";
                // options_data["answer_explanation_content"] = "";
                // options_data["explanation_content_type"] = "";
                // options_data["resource_name"] = "";
                // options_data["resource_url"] = "";
                final_json_sheet.push(options_data);
            }
        });
   // });
    console.log("\nWriting into file\n");
    const jsonData = JSON.stringify(final_json_sheet);
  fs.writeFile(final_responses_path, jsonData, 'utf8', (err) => {
    if (err) {
      console.error('An error occurred while writing the file:', err);
      return;
    }
    console.log('JSON file has been created successfully!');
  });
}

async function start() {
    try {
        const prompt_responses = await getPromptResponses();
        extractQuestionsData(prompt_responses);
    } catch (error) {
      console.error("Error during processing:", error);
    }
}

start();
