const fetchURL = (url) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				requestedUrl: url
			})
		}, 500)
	})
};

const urlsToFetch = [
	'/home',
	'/lib',
	'/account',
	'/friends'
];

console.log('start:');

Promise.all([fetchURL(urlsToFetch[0]),
            fetchURL(urlsToFetch[1]),
            fetchURL(urlsToFetch[2]),
            fetchURL(urlsToFetch[3])]).then(values => {
                console.log(values);
            }).then(() => {
				console.log('end;');
			});

