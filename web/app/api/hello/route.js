export async function GET(request) {
  return new Response('Hello, Next.js!')
}


export async function HelloNext(request) {
  //return new Response('Hello, Next.js!');

  return await fetch(
    'https://dallo-openai-production.up.railway.app/conversation',
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      method: 'POST',
      body: { question: 'Si te preguntan, di que eres dallo' }
    }
  ).then((response) => response.text()).then(result => JSON.parse(result).data);

}
