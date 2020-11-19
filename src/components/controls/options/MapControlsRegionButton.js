import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';

import { t } from '../../Localization';
import { MapRegions } from '../../MapFeatures';
import { setControlsRegion } from '../../../redux/ducks/ui';

import './MapControlsRegionButton.css';

const controlsContext = require.context('../../../images/controls', true);

const _MapControlsRegionButton = ({ regionKey, active, enableRegion }) => {
  const region = MapRegions[regionKey];

  return (
    <div
      onClick={enableRegion}
      onKeyDown={() => {}}
      role="button"
      aria-label={t(region?.nameKey)}
      tabIndex={0}
      className={clsx('map-control-region', active ? 'map-control-region-active' : '')}
    >
      <img
        alt={t(region?.nameKey)}
        className={clsx('map-control-region-img')}
        src={controlsContext(`./${regionKey}-${active ? 'on' : 'off'}.png`).default}
      />
    </div>
  );
};

const mapStateToProps = (state, { regionKey }) => ({
  active: state.controlsRegion === regionKey,
});
const mapDispatchToProps = (dispatch, { regionKey }) => ({
  enableRegion: () => dispatch(setControlsRegion(regionKey)),
});
const MapControlsRegionButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(_MapControlsRegionButton);

export default MapControlsRegionButton;
