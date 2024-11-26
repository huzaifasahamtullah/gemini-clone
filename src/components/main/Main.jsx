import { useContext } from "react";
import { Context } from "../../context/Context";
import LottieAnimation from "../Loader/LottieAnimation";
import "./main.css";

const Main = () => {
    const {
        onSent,
        showResults,
        loading,
        setInput,
        input,
        responseHistory,
    } = useContext(Context);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onSent(input); // Pass the input when sending
        }
    };

    return (
        <div className="main">
            <div className="nav">
                <p>F3 Digitals</p>
            </div>

            <div className="main-container">
                {!showResults ? (
                    <>
                        <div className="greet">
                            <p>
                                <span>Welcome, Need Insights?</span>
                            </p>
                            <p>Ask Me To Help!</p>
                        </div>
                    </>
                ) : (
                    <div className="result">
                        {responseHistory.map((item, index) => (
                            <div key={index} className="result-entry">
                                <div className="result-title">
                                    <p>{item.prompt}</p>
                                </div>

                                {/* Show text response if available */}
                                {item.response && (
                                    <div className="result-response">
                                        <h3>AI Answer</h3>
                                        <p>{item.response}</p> {/* Display "my name is fahad" */}
                                    </div>
                                )}

                                {/* Show Dynamic Table if available */}
                                {Array.isArray(item.response) && item.response.length > 0 && (
                                    <div className="result-table">
                                        <h3>AI Response Table</h3>
                                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                            <thead>
                                                <tr>
                                                    {Object.keys(item.response[0]).map((key, index) => (
                                                        <th key={index} style={{ border: "1px solid #ddd", padding: "8px" }}>
                                                            {key}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {item.response.map((row, rowIndex) => (
                                                    <tr key={rowIndex}>
                                                        {Object.values(row).map((value, colIndex) => (
                                                            <td key={colIndex} style={{ border: "1px solid #ddd", padding: "8px" }}>
                                                                {value}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        ))}

                        <div className="result-data">
                            {loading ? (
                                <div className="lottieLoader">
                                    <LottieAnimation />
                                </div>
                            ) : (
                                <p></p>
                            )}
                        </div>
                    </div>
                )}

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            id="inputPrompt"
                            value={input}
                            type="text"
                            placeholder="Enter the Prompt Here"
                            onKeyDown={handleKeyDown}
                        />
                        <div>
                            <img src="send_icon.svg" alt="Send" onClick={() => onSent(input)} />
                        </div>
                    </div>
                    <div className="bottom-info">
                        <p>Limitations with LLM models may reflect in results.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
