import React from "react";
import SubjectSelect from "./SubjectSelect";
import Subjects from "./SubjectItem/Subjects";
import TimetableViewer from "./Timetable/TimetableViewer";
import Notifications from "./Notifications";
import styled from "styled-components";
import Optimisations from "./Optimisations/Optimisations";
import Sponsors from "./Sponsors/Sponsors";
import OptimiseButton from "./OptimiseButton";
import RegistrationCountdown from "./RegistrationCountdown";
import Sidebar from "./Sidebar/Sidebar";
import BronzeSponsors from "./Sponsors/BronzeSponsors";

const Grid = styled.div`
  grid-template-columns: 100%;
  height: calc(100% - 60px);

  @media screen and (min-width: 960px) {
    display: grid;
    grid-template-columns: [sidebar] minmax(20%, 380px) [viewer] auto;
    grid-template-rows: auto;
  }
`;

const SidebarWrapper = styled.div`
  background-color: ${props => props.theme.sidebarBg};
  grid-column-start: 1;
  max-width: inherit;
  padding: 10px;
  padding-bottom: 20px;
  z-index: 2;
  box-shadow: -2px 0 3px 0 rgba(0, 0, 0, 0.12);

  @media screen and (min-width: 960px) {
    grid-column-start: sidebar;
    box-shadow: 2px -2px 1px -2px rgba(0, 0, 0, 0.15);
    /* border-right: solid 1px #eee; */
  }
`;

const Main = styled.div`
  grid-column-start: 1;
  padding-top: 10px;

  @media screen and (min-width: 960px) {
    grid-column-start: viewer;
    padding: 10px;
  }
`;

export default function Planner() {
  return (
    <Grid>
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>
      <Main>
        <Sponsors />
        <TimetableViewer />
        <BronzeSponsors />
      </Main>
    </Grid>
  );
}
