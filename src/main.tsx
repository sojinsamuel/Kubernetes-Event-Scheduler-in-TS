import React from "react";
import { readFile, writeFile } from "fs/promises";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

const events = [
  {
    title: "Kubernetes YAML tutorial in 60 minutes",
    host: "Edureka Masterclass",
    type: "Online webinar",
    date: "26 Jan",
  },
  {
    title: "Docker and Kubernetes on Rancher",
    host: "Black Women Tech Xchange",
    type: "Online workshop",
    date: "26 Jan",
  },
  {
    title: "Kubernetes configuration security and compliance on EKS",
    host: "Tigera",
    type: "Online workshop",
    date: "26 Jan",
  },
  {
    title: "Offload AWS provisioning to Kubernetes operators",
    host: "AWS Bulgaria User Group",
    type: "In-person meetup",
    date: "26 Jan",
  },
  {
    title: "Self-Driving Delivery into Kubernetes with ArgoCD",
    host: "Cloud Native + Kubernetes Manchester",
    type: "In-person meetup",
    date: "26 Jan",
  },
  {
    title: "Introduction to Kubernetes",
    host: "Fyns Linux User Group",
    type: "In-person meetup",
    date: "26 Jan",
  },
  {
    title: "A quickstart guide to Kubernetes concepts",
    host: "Microsoft",
    type: "Online webinar",
    date: "26 Jan",
  },
  {
    title: "#dontusekubernetes",
    host: "Boston Devops",
    type: "In-person meetup",
    date: "26 Jan",
  },
  {
    title: "Kubernetes on Azure",
    host: "Come Cloud With Us",
    type: "Online meetup",
    date: "26 Jan",
  },
  {
    title:
      "Flyte - a Kubernetes-native workflow automation platform ML and data processes at scale",
    host: "Bellevue Applied Machine Learning Meetup",
    type: "In-person meetup",
    date: "26 Jan",
  },
  {
    title: "GitOps and Kubernetes automation in 3 weeks",
    host: "O'Reilly",
    type: "In-person meetup",
    date: "26 Jan",
  },
];

const base64Image = async (filename: string): Promise<string> => {
  const file = await readFile(filename, "base64");
  return `data:image/png;base64,${file}`;
};

const bottomImg = await base64Image("./bottom-img.png");

const template = (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      padding: "1em 2em",
      position: "relative",
    }}
  >
    <img
      width="34"
      height="500"
      src={bottomImg}
      style={{
        position: "absolute",
        width: "100vw",
        height: "10vh",
        bottom: 0,
      }}
    />
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Kubernetes Events starting in the next 24 hours:</h1>
      {events.map(({ title, date, host, type }) => (
        <h2
          key={title}
          style={{
            display: "flex",
            wordBreak: "break-all",
            whiteSpace: "pre-wrap",
          }}
        >
          {date} -{" "}
          <a href="#" style={{ color: "blue" }}>
            {title.length > 50 ? title.slice(0, 50) + "..." : title}
          </a>{" "}
          | {host} - {type}
        </h2>
      ))}
    </div>
  </div>
);

const svg = await satori(template, {
  width: 1200,
  fonts: [
    {
      name: "VictorMono",
      data: await readFile("./VictorMono-Bold.ttf"),
      weight: 700,
      style: "normal",
    },
  ],
});

const resvg = new Resvg(svg, {
  background: "rgba(247,249,252,255)",
});
const pngData = resvg.render();
const pngBuffer = pngData.asPng();

await writeFile("./events.png", pngBuffer);
