//
// Example module
//

module.exports = {
    name: 'Example',

    async load(client) {
        // Ready event
        client.on('ready', () => {
            console.log(`Logged in as ${client.user.tag}!`);
        });

        // You can create as many modules as you want.
    }
}




