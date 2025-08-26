import { IGenericResponse } from "@/@types/common";
import { ISectionMusic } from "@/@types/songs";
import { http } from "@/configs/http.config";
import { useQuery } from "@tanstack/react-query";

const getTop100 = async () => {
	const res = await http.get<IGenericResponse<ISectionMusic[]>>("/api/top-100");
	console.log(res);
	return res.data;
};

function useTop100() {
	return useQuery({
		queryKey: ["top-100"],
		queryFn: getTop100,
	});
}

export { useTop100 };
