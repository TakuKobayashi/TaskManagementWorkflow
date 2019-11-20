import React from 'react';
import { Sidebar, SidebarItem } from 'react-rainbow-components';

interface SelectedItem {
  selectedItem: string;
}

export class SidebarCompoment extends React.Component {
  state: SelectedItem = {
    selectedItem: 'GettingStarted',
  };

  constructor(props: any) {
    super(props);
    this.handleOnSelect = this.handleOnSelect.bind(this);
  }

  handleOnSelect(e: React.MouseEvent<HTMLElement, MouseEvent>, selectedItem: string) {
    return this.setState({ selectedItem });
  }

  render() {
    const { selectedItem } = this.state;

    return (
      <Sidebar selectedItem={selectedItem} onSelect={this.handleOnSelect} id="sidebar-1">
        <SidebarItem name="Dashboard" label="Dashboard" />
        <SidebarItem name="Aplications" label="Aplications" />
        <SidebarItem name="Components" label="Components" />
        <SidebarItem name="Messages" label="Messages" />
        <SidebarItem name="Charts" label="Charts" />
      </Sidebar>
    );
  }
}
