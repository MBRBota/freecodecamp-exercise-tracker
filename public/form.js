console.log("loaded")

const exerciseForm = document.getElementById("exercise-form");
const logForm = document.getElementById("log-form");

exerciseForm.addEventListener("submit", () => {
    const userId = document.getElementById("exercise-user-id").value;
    exerciseForm.action = `/api/users/${userId}/exercises`;
    exerciseForm.submit();
})

logForm.addEventListener("submit", () => {
    const userIdField = document.getElementById("log-user-id");
    const userId = userIdField.value;
    logForm.action = `/api/users/${userId}/logs`;

    // prevent user ID from being sent as a parameter in GET request
    userIdField.removeAttribute("name");
    logForm.submit();
})