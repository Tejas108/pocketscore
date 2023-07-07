const withPWA = require("next-pwa");

module.exports = withPWA({
	dest: "public",
	register: true,
	skipWaiting: true,
	// display: "standalone",
	//disable: process.env.NODE_ENV === 'development',
});