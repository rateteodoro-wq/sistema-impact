export const config = {
  // Define que esse middleware só vai rodar quando tentarem acessar a página de assinantes ou a calculadora
  matcher: ['/assinantes.html', '/assinantes', '/calculadora.html', '/calculadora'],
}

export default function middleware(request) {
  // Pega as credenciais que o navegador envia
  const authHeader = request.headers.get('authorization')

  // Se não tiver credenciais, barra e pede a senha
  if (!authHeader) {
    return new Response('Acesso Restrito - Identifique-se', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="SISTEMA IMPACT - AREA DE ASSINANTES"'
      }
    })
  }

  // Descriptografa as credenciais
  const authValue = authHeader.split(' ')[1]
  const [user, pwd] = atob(authValue).split(':')

  // =============== CONFIGURAÇÃO DE SENHA ===============
  // Altere 'aluno' para o usuário que desejar
  // Altere 'impact2026' para a senha que os alunos vão usar
  // =====================================================
  if (user === 'aluno' && pwd === 'impact2026') {
    return; // Permite que a página seja carregada
  }

  // Se a senha estiver errada, recusa e pede novamente
  return new Response('Credenciais invalidas.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="SISTEMA IMPACT - AREA DE ASSINANTES"'
    }
  })
}
