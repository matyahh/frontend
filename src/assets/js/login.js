document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Limpar mensagem de erro anterior
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';

        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        try {
            console.log('Tentando login com:', { email }); // Debug (não logar a senha)

            const response = await fetch('https://backend-production-9519.up.railway.app/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            });

            console.log('Status da resposta:', response.status); // Debug

            // Tentar ler o corpo da resposta como JSON
            let data;
            try {
                data = await response.json();
                console.log('Dados da resposta:', data); // Debug
            } catch (e) {
                console.error('Erro ao parsear JSON:', e);
                throw new Error('Erro ao processar resposta do servidor');
            }

            // Verificar se a resposta foi bem sucedida
            if (!response.ok) {
                throw new Error(data.error || 'Credenciais inválidas');
            }

            if (!data.token) {
                throw new Error('Token não recebido do servidor');
            }

            // Salvar token
            localStorage.setItem('token', data.token);
            console.log('Token salvo com sucesso'); // Debug

            // Redirecionar para o painel admin
            window.location.href = '../admin/admin.html';
        } catch (error) {
            console.error('Erro completo:', error);
            errorMessage.textContent = error.message || 'Erro ao fazer login. Tente novamente.';
            errorMessage.style.display = 'block';
        }
    });
});
