import React from 'react';

const Tabs = ({ match, tabs }) => (
  <div>
    { tabs.map((tab) => {
      if (match !== undefined && tab.id === match.params.id) {
        return tab.title;
      }

      return null;
    })}
  </div>
);

export default Tabs;
