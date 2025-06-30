export async function load({ url }) {
	const name = url.searchParams.get('name');

	if (!name) return { age: null, name: '' };

	const res = await fetch(`https://api.agify.io?name=${name}`);
	const data = await res.json();

	return {
		age: data.age,
		name
	};
}
