import React from 'react';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';

interface SellerDashboardProps {}

export const SellerDashboard = (props: SellerDashboardProps) => {
  return <h1>SELLERS</h1>;
};

const mapStateToProps = ({ authentication }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SellerDashboard);
