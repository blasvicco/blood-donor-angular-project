const { env } = process;
module.exports = {
	url: 'mongodb+srv://' + env['DB_USERNAME'] + ':' + env['DB_PASSWORD'] + '@' + env['DB_HOST'] + '/' + env['DB_NAME'] + '?retryWrites=true&w=majority'
};
