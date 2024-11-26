import { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [tableData, setTableData] = useState([]);
    const [responseHistory, setResponseHistory] = useState([]);

    // Mock response with text data
    const mockResponse = {
        "text": {
            "response": "my name is fahad"  // This is the desired text response
        }
    };

    const newChat = () => {
        setLoading(false);
        setShowResults(false);
        setTableData([]);
        setResultData("");
    };

    const onSent = async (prompt) => {
        setRecentPrompt(prompt);
        setInput("");
        setResultData("");
        setLoading(true);
        setShowResults(true);

        try {
            const responseData = mockResponse.text;  // Fetching the mock text response

            if (responseData) {
                // Set the text response as result data
                setResultData(responseData.response);  // "my name is fahad"
                setTableData([]);  // Clear table data if we get text response
            }

            // Update response history with the current prompt and its response
            setResponseHistory((prevHistory) => [
                ...prevHistory,
                { prompt: recentPrompt || input, response: responseData.response || "" }
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
        showResults,
        loading,
        resultData,
        tableData,
        newChat,
        onSent,
        responseHistory
    };

    return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};

export default ContextProvider;
