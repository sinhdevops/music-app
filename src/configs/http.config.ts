type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions extends RequestInit {
	params?: Record<string, string | number>;
}

class HttpClient {
	private baseURL: string;
	private defaultHeaders: HeadersInit;

	constructor(baseURL?: string, defaultHeaders: HeadersInit = {}) {
		this.baseURL = baseURL || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
		this.defaultHeaders = {
			"Content-Type": "application/json",
			...defaultHeaders,
		};
	}

	private buildUrl(url: string, params?: Record<string, string | number>) {
		// Nếu endpoint là /api thì luôn gọi localhost
		let base = this.baseURL;

		if (url.startsWith("/api")) {
			base = "http://localhost:3000";
		}

		// Nếu base chưa có protocol (http/https), thêm vào
		if (!/^https?:\/\//.test(base)) {
			base = `http://${base}`;
		}

		const fullUrl = new URL(url, base);

		if (params) {
			Object.keys(params).forEach((key) => fullUrl.searchParams.append(key, String(params[key])));
		}
		return fullUrl.toString();
	}

	private async request<T>(method: HttpMethod, url: string, options: RequestOptions = {}): Promise<T> {
		const { params, ...rest } = options;
		const response = await fetch(this.buildUrl(url, params), {
			method,
			headers: this.defaultHeaders,
			...rest,
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`HTTP ${response.status}: ${errorText}`);
		}

		return response.json() as Promise<T>;
	}

	get<T>(url: string, options?: RequestOptions) {
		return this.request<T>("GET", url, options);
	}

	post<T>(url: string, body?: any, options?: RequestOptions) {
		return this.request<T>("POST", url, {
			body: JSON.stringify(body),
			...options,
		});
	}

	put<T>(url: string, body?: any, options?: RequestOptions) {
		return this.request<T>("PUT", url, {
			body: JSON.stringify(body),
			...options,
		});
	}

	patch<T>(url: string, body?: any, options?: RequestOptions) {
		return this.request<T>("PATCH", url, {
			body: JSON.stringify(body),
			...options,
		});
	}

	delete<T>(url: string, options?: RequestOptions) {
		return this.request<T>("DELETE", url, options);
	}
}

export const http = new HttpClient();
