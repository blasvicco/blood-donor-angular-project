const { env } = process;
module.exports = {
	url: `mongodb://${env['DB_USERNAME']}:${env['DB_PASSWORD']}@${env['DB_HOST']}:${env['DB_PORT']}/${env['DB_NAME']}`,
};
