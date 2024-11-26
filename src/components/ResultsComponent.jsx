import React, { useContext } from "react";
import { Context } from "../context/Context";

const ResultsComponent = () => {
	const { resultData, base64Image, tableData, showResults, loading } = useContext(Context);

	return (
		<div>
			{/* Show Loading Indicator */}
			{loading && <p>Loading...</p>}
	
			{/* Show AI Response */}
			{showResults && (
				<div>
					<h3>AI Response</h3>
					<p dangerouslySetInnerHTML={{ __html: resultData }}></p>
				</div>
			)}
	
			{/* Show base64 Image if available */}
			{base64Image && (
				<div>
					<h3>Generated Image</h3>
					<img src={`data:image/png;base64,${base64Image}`} alt="Generated" />
				</div>
			)}
	
			{/* Show Dynamic Table if ai_response has data */}
			{tableData.length > 0 && (
				<div>
					<h3>AI Response Table</h3>
					<table style={{ width: "100%", borderCollapse: "collapse" }}>
						<thead>
							<tr>
								{/* Generate table headers dynamically */}
								{Object.keys(tableData[0]).map((key, index) => (
									<th key={index} style={{ border: "1px solid #ddd", padding: "8px" }}>
										{key}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{/* Generate table rows dynamically */}
							{tableData.map((row, rowIndex) => (
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
	);
};

export default ResultsComponent;
