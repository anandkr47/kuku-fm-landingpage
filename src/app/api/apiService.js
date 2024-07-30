"use server";

export const fetchData = async (page = 1) => {
  const res = await fetch(
    `https://d31ntp24xvh0tq.cloudfront.net/api/v2.1/home/all/?preferred_langs=hindi&page=${page}&lang=english`
  );
  const data = await res.json();
  return data;
};
