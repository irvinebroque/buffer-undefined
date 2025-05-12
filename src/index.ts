import { client, v2 } from '@datadog/datadog-api-client';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const configuration = client.createConfiguration({
			authMethods: {
				apiKeyAuth: env.DATADOG_API_KEY,
				appKeyAuth: env.DATADOG_APP_KEY,
			},
		});
		const apiInstance = new v2.LogsApi(configuration);

		const params: v2.LogsApiSubmitLogRequest = {
			body: [
				{
					ddsource: 'cloudflare-worker',
					ddtags: 'some-tag',
					hostname: 'some-hostname',
					message: '2019-11-19T14:37:58,995 INFO [process.name][20081] Hello World',
					service: 'my-service',
				},
			],
			contentEncoding: 'gzip',
		};

		await apiInstance
			.submitLog(params)
			.then((data: any) => {
				console.log('API called successfully. Returned data: ' + JSON.stringify(data));
			})
			.catch((error: any) => console.error(error));

		return new Response('Hello World!');
	},
} satisfies ExportedHandler<Env>;