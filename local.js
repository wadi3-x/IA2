export function geteapi() {
    return localStorage.getItem("apiKey");
}


export function isDemoMode() {
    return localStorage.getItem("activeMode") === "demo";
}


export function clearProjectData() {
    localStorage.removeItem("papa");
    localStorage.removeItem("tasks");
}