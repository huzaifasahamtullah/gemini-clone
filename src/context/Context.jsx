import { createContext, useState } from "react";
import apiService from "../config/ApiService";

export const Context = createContext();

const ContextProvider = (props) => {
	const [input, setInput] = useState("");
	const [recentPrompt, setRecentPrompt] = useState("");
	const [prevPrompts, setPrevPrompts] = useState([]);
	const [showResults, setShowResults] = useState(false);
	const [loading, setLoading] = useState(false);
	const [resultData, setResultData] = useState("");
	const [base64Image, setBase64Image] = useState(null);
	const [tableData, setTableData] = useState([]);
	const [responseHistory, setResponseHistory] = useState([]);

	const delayPara = (index, nextWord) => {
		setTimeout(() => {
			setResultData((prev) => prev + nextWord);
		}, 10 * index);
	};

	const newChat = () => {
		setLoading(false);
		setShowResults(false);
		setBase64Image(null);
		setTableData([]);
	};

	const onSent = async (prompt) => {
		setRecentPrompt(prompt);
		setInput("");
		setResultData("");
		setLoading(true);
		setShowResults(true);
		let response;

		if (prompt !== undefined) {
			response = await apiService.startChat(prompt);
		} else {
			setPrevPrompts((prev) => [...prev, input]);
			const obj = {
				doc_id: "ZRqrTA_20241019143437",
				query: input,
			};
			response = await apiService.startChat(obj);
			console.log("AI Response: ", response);
		}

		try {
			let data = response.base64_image;
			if (data) {
				setBase64Image(data);
			} else {
				if (typeof response.ai_response === 'string') {
					setResultData(response.ai_response);
				} else if (Array.isArray(response.ai_response) && response.ai_response.length > 0) {
					setTableData(response.ai_response);
					setResultData('');
				}

				if (typeof response.ai_response === 'string') {
					let newResponseArray = response.ai_response.split("");
					for (let i = 0; i < newResponseArray.length; i++) {
						const nextWord = newResponseArray[i];
						delayPara(i, nextWord);
					}
				}
			}

			// Update the response history
			setResponseHistory((prevHistory) => [
				...prevHistory,
				{
					prompt: recentPrompt || input,
					response: response.ai_response || "",
					base64Image: data || null,
					tableData: response.ai_response || [],
				}
			]);
		} catch (error) {
			console.error("Error while running chat:", error);
		} finally {
			setLoading(false);
			setInput("");
		}
	};

	const contextValue = {
		input,
		setInput,
		recentPrompt,
		setRecentPrompt,
		prevPrompts,
		setPrevPrompts,
		showResults,
		loading,
		resultData,
		base64Image,
		tableData,
		newChat,
		onSent,
		responseHistory,
	};

	return (
		<Context.Provider value={contextValue}>
			{props.children}
		</Context.Provider>
	);
};

export default ContextProvider;