import React from "react";
import { Tab } from "semantic-ui-react";

import useTab from "../hooks/use-tab";
import routes from "../routes";
import Notion from "./notion";
import GooglePlayBooks from "./google-play-books";
import Coursera from "./coursera";
import PDF from "./pdf";
import Youtube from "./youtube";
import Kindle from "./kindle";

const panes = [
  {
    menuItem: "Notion",
    route: routes.notion,
    render: () => (
      <Tab.Pane className="animate-in">
        <Notion />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Google play books",
    route: routes.googlePlayBooks,
    render: () => (
      <Tab.Pane className="animate-in">
        <GooglePlayBooks />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Coursera",
    route: routes.coursera,
    render: () => (
      <Tab.Pane className="animate-in">
        <Coursera />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "PDF",
    route: routes.pdf,
    render: () => (
      <Tab.Pane className="animate-in">
        <PDF />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Youtube",
    route: routes.youtube,
    render: () => (
      <Tab.Pane className="animate-in">
        <Youtube />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Kindle",
    route: routes.kindle,
    render: () => (
      <Tab.Pane className="animate-in">
        <Kindle />
      </Tab.Pane>
    ),
  },
];

const Home = () => {
  const { activeIndex, onTabChange } = useTab({ panes });

  React.useEffect(() => {
    document.body.classList.add("bg-gray-100");
    return () => {
      document.body.classList.remove("bg-gray-100");
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h1>Notes exporter</h1>
      <p>
        Export notes from notion, coursera, and google play books. Please follow
        the guid in each tab
      </p>

      <Tab
        menu={{
          secondary: true,
          pointing: true,
          className: "flex flex-wrap",
        }}
        panes={panes}
        onTabChange={onTabChange}
        activeIndex={activeIndex}
      />
    </div>
  );
};

export default Home;
