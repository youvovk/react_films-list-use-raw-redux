import React from 'react';

import {
  Route,
  NavLink,
} from 'react-router-dom';

import Tabs from '../Tabs/Tabs';

const TabsPage = ({ match, tabs }) => (
  <div className="tabs-page">
    <h1>Tabs</h1>

    <div className="tabs">
      { tabs.map(tab => (
        <>
          <NavLink
            className="tab link"
            to={`${match.url}/${tab.id}`}
          >
            {tab.title}
          </NavLink>
        </>
      ))
      }
    </div>

    <Route
      path={`${match.path}/:id`}
      render={match => (
        <Tabs match={match} tabs={tabs} />
      )}
    />

  </div>
);

export default TabsPage;
