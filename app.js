const users = {
    user1: { username: 'user1', role: 'user' },
    admin1: { username: 'admin1', role: 'admin' },
};

function login() {
    const username = document.getElementById('username').value;
    const user = users[username];
    const messageDiv = document.getElementById('message');

    if (!user) {
        messageDiv.style.color = 'red';
        messageDiv.innerText = 'User not found';
        return;
    }

    messageDiv.style.color = 'green';
    if (user.role === 'admin') {
        messageDiv.innerText = 'Welcome Admin';
    } else if (user.role === 'user') {
        messageDiv.innerText = 'Welcome User';
    }
}
