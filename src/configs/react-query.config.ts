/* eslint-disable @typescript-eslint/no-explicit-any */

import { type DefaultOptions, type UseMutationOptions, type UseQueryOptions, QueryClient } from "@tanstack/react-query";

const queryConfig: DefaultOptions = {
	queries: {
		refetchOnWindowFocus: false,
		retry: false,
	},
};

export type ExtractFnReturnType<FnType extends (...args: any) => any> = Awaited<ReturnType<FnType>>;

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
	UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
	"queryKey" | "queryFn"
>;

export type GenericQueryConfig<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData> = Omit<
	UseQueryOptions<TQueryFnData, TError, TData>,
	"queryKey" | "queryFn" | "initialData"
>;

export type QueryConfigV8<QueryFnType extends (...args: any) => any> = Pick<
	UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
	"enabled"
>;

export type MutationConfig<MutationFnType extends (...args: any) => any> = UseMutationOptions<
	ExtractFnReturnType<MutationFnType>,
	Parameters<MutationFnType>[0]
>;

export const queryClient = new QueryClient({ defaultOptions: queryConfig });
