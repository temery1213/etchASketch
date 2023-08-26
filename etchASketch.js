document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("flexContainer");
    const squareSizeButton = document.getElementById("squareSize");

    // Track the current opacity for each square
    let currentOpacityMap = new Map();

    function createSquares(totalSquares) {
        const squareSize = Math.floor(Math.sqrt(10000 / totalSquares));
        const numCols = Math.floor(100 / squareSize);
        const numRows = Math.ceil(totalSquares / numCols);
    
        container.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;
    
        for (let i = 0; i < totalSquares; i++) {
            const square = document.createElement("div");
            square.classList.add("squares");
            container.appendChild(square);

            currentOpacityMap.set(square, 0); // Initialize opacity for the square
    
            square.addEventListener("mouseover", function () {
                // Update opacity for the square by 10% each time
                const currentOpacity = currentOpacityMap.get(square) + 0.1;
                if (currentOpacity > 1) {
                    currentOpacityMap.set(square, 1); // Ensure opacity doesn't exceed 1
                } else {
                    currentOpacityMap.set(square, currentOpacity);
                }

                // Set the background color with updated opacity for the square
                square.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacityMap.get(square)})`;
            });
        }
    
        const squares = document.querySelectorAll(".squares");
        squares.forEach(square => {
            square.style.flex = `0 0 calc(100% / ${numCols})`; 
            square.style.paddingBottom = `calc(100% / ${numCols})`; 
        });
    }

    // Initial creation of 16 squares
    createSquares(4);

    squareSizeButton.addEventListener("click", function () {
        const userInput = parseInt(prompt("Enter the number of squares on a side:"));

        if (!isNaN(userInput) && userInput >= 1 && userInput <= 100) {
            // Clear existing squares
            container.innerHTML = "";
            currentOpacityMap.clear(); // Reset opacity tracking
            createSquares(userInput);
        } else {
            alert("Please enter a valid number between 1 and 100.");
        }
    });
});
