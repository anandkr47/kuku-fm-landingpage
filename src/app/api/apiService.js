"use server";

export const fetchData = async (language = "english", page = 1) => {
  const res = await fetch(
    `https://d31ntp24xvh0tq.cloudfront.net/api/v2.1/home/all/?preferred_langs=${language}&page=${page}&lang=${language}`
  );
  const data = await res.json();
  return data;
};
