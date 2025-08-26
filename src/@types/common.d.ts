export interface IGenericResponse<T = any> {
	map(arg0: (item: any) => string): unknown;
	err: number;
	msg: "success" | string;
	data: T;
}
