import React from "react";
import { Container, Tab } from "semantic-ui-react";
import useTab from "../hooks/use-tab";
import routes from "../routes";
import Notion from "./notion";

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
    <div className="max-w-4xl mx-auto mt-8">
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
