const container = document.getElementById("aboutMeContainer");
const draggableElements = document.querySelectorAll(".aboutMeContainerDivs");

// Function to randomly position each draggable element within the container
function setRandomPosition(element) {
    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    // Calculate random x and y within the container's boundaries
    const maxX = containerRect.width - elementRect.width;
    const maxY = containerRect.height - elementRect.height;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    // Set the initial position
    element.style.left = `${randomX}px`;
    element.style.top = `${randomY}px`;
}

// Initialize random positions for each draggable element
draggableElements.forEach(element => {
    setRandomPosition(element);

    let offsetX = 0, offsetY = 0, isDragging = false;

    element.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;
        document.addEventListener("mousemove", moveElement);
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        document.removeEventListener("mousemove", moveElement);
    });

    function moveElement(e) {
        if (isDragging) {
            let x = e.clientX - offsetX;
            let y = e.clientY - offsetY;

            // Constrain within container boundaries
            const containerRect = container.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();

            if (x < 0) x = 0;
            if (y < 0) y = 0;
            if (x + elementRect.width > containerRect.width) x = containerRect.width - elementRect.width;
            if (y + elementRect.height > containerRect.height) y = containerRect.height - elementRect.height;

            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
        }
    }
});
