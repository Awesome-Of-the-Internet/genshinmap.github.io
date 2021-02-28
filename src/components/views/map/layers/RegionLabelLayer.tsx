/**
 * Provides the map layer which displays the map labels
 * on the Leaflet map.
 */

import { makeStyles } from '@material-ui/core';
import { divIcon, marker } from 'leaflet';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { GeoJSON } from 'react-leaflet';
import { connect } from 'react-redux';
import { GeoJsonObject } from 'geojson';

import { localizeField } from '~/components/i18n/FeatureLocalization';
import { AppState } from '~/components/redux/types';

// The data file which contains the information on the region label markers.
import RegionLabelData from '~/data/core/map-labels.json';

const useStyles = makeStyles((_theme) => ({
  regionLabelMarker: {
    backgroundColor: 'transparent',
    width: 'auto !important',
  },

  regionLabelText: {
    margin: 0,
    fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
    whiteSpace: 'nowrap',
    color: 'white',
    fontSize: '1.75em',
    fontWeight: 'bold',

    width: 'auto !important',
    position: 'relative',
    left: '-50%',
  },
}));

const RegionLabel = ({ featureData, zoomLevel }) => {
  const classes = useStyles();

  const name = localizeField(featureData?.properties?.label);
  /**
   * Dynamically style based on zoom level.
   * Currently used to scale text, but if needed,
   * a switch/case structure could be used for
   * finer tuning.
   */
  const style = {
    fontSize: `${zoomLevel * 0.25}em`,
    WebkitTextStroke: `${zoomLevel * 0.125}px black`,
    textStroke: `${zoomLevel * 0.125}px black`,
    top: `-${zoomLevel * 2}px`,
  };
  return (
    <h1 className={classes.regionLabelText} style={style}>
      {name}
    </h1>
  );
};

const _RegionLabelLayer = ({ displayed, zoomLevel }) => {
  const classes = useStyles();

  const pointToLayer = (featureData, latLng) => {
    const html = ReactDOMServer.renderToString(
      <RegionLabel featureData={featureData} zoomLevel={zoomLevel} />
    );

    return marker([latLng.lng, latLng.lat], {
      interactive: false, // Allow clicks to pass through.
      icon: divIcon({
        html,
        className: classes.regionLabelMarker,
      }),
      zIndexOffset: -900,
    });
  };

  // TODO: We destroy the layer if it's hidden. Is there a more performant way?
  if (!displayed) return null;

  return (
    <GeoJSON key={zoomLevel} pointToLayer={pointToLayer} data={RegionLabelData as GeoJsonObject} />
  );
};

const mapStateToProps = (state: AppState) => ({
  displayed: state.options.regionLabelsEnabled,
  zoomLevel: state.ui.mapPosition.zoom,
});
const mapDispatchToProps = (_dispatch) => ({});
const RegionLabelLayer = connect(mapStateToProps, mapDispatchToProps)(_RegionLabelLayer);

export default RegionLabelLayer;