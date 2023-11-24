const loginForm = document.getElementById("loginForm")

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const form = new FormData(loginForm)
    const data = Object.fromEntries(form.entries())

    const req = await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const json = await req.json()
    console.log(json)
})