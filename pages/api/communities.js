import { SiteClient } from 'datocms-client';

export default async function receiveRequest(request, response) {
  if (request.method === 'POST') {
    const token = 'b79cbb9abd4181cb9307ffc9f4f661';
    const client = new SiteClient(token);

    const newRegistry = await client.items.create({
      itemType: '975327',
      ...request.body,
      //title: "Comunidade de Teste",
      //imageUrl: "https://github.com/fernandoc89.png",
      //creatorSlug: "fernandoc89"
    })

    console.log(newRegistry);

    response.json({
      newRegistry: newRegistry,
    })

    return;
  }

  response.status(404).json({
    message: 'Nessa página só é possível utilizar o método POST.'
  })
}