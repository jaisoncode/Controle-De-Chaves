
const login = document.querySelector('#login-id');
const senha = document.querySelector('#senha-id');
const formLogin = document.querySelector('#form-login');

formLogin.addEventListener('submit', function (event) {
    event.preventDefault();

    const loginJson = {
        login: login.value,
        senha: senha.value,
    };

    fazerLogin(loginJson);
});

async function fazerLogin(loginData) {
    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        if (!response.ok) {
            throw new Error('Login inválido');
        }

        const data = await response.json();
        const { token } = data;

        await fazerRequisicaoGETComToken(token);

    } catch (error) {
        console.error('Erro durante o login:', error.message);
        
    }
}

async function fazerRequisicaoGETComToken(token) {
    try {
        const response = await fetch('http://localhost:8080/page/cadastro-de-chaves', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Falha na requisição GET');
        } else{
            window.location.href = '/page/cadastro-de-chaves';
        }

    } catch (error) {
        console.error('Erro na requisição GET:', error.message);
        // Manipular ou mostrar mensagem de erro para o usuário
    }
}
