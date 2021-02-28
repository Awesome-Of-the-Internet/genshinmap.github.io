/**
 * Provides the interface for the Categories tab button
 * within the Features and Routes tabs of the Map controls.
 */

import { makeStyles, Button } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';

import { getEmptyFeatureCategories, getEmptyRouteCategories } from '~/components/data/MapFeatures';
import { t } from '~/components/i18n/Localization';
import { setControlsCategory } from '~/components/redux/ducks/ui';

import MapCategories from '~/data/core/categories.json';

const useStyles = makeStyles((_theme) => ({
  categoryButton: {
    margin: '4px 4px 4px 4px',
    padding: '8px 4px 8px 4px',

    flex: '1 0 25%',
  },
}));

const _MapControlsCategoryButton = ({ active, style, nameKey, displayed, enableCategory }) => {
  const classes = useStyles();

  if (!displayed) return null;

  const buttonStyle = {
    backgroundColor: active ? style?.enabled?.bg : style?.disabled?.bg ?? '#FFF',
    color: active ? style?.enabled?.text : style?.disabled?.text ?? '#000',
    flexBasis: style?.fullWidth ? '95%' : null,
  };

  return (
    <Button
      onClick={enableCategory}
      variant="contained"
      style={buttonStyle}
      className={classes.categoryButton}
    >
      {t(nameKey)}
    </Button>
  );
};

const mapStateToProps = (
  { controlsTab, controlsRegion, controlsCategory, options: { overrideLang: lang } },
  { categoryKey }
) => {
  const { enabled, style, nameKey } = MapCategories[categoryKey];
  // Check if the given category is empty for the active region.
  let categoryEmpty = true;
  switch (controlsTab) {
    case 'features':
      const featureList = getEmptyFeatureCategories(controlsRegion);
      categoryEmpty = featureList[categoryKey];
      break;
    case 'routes':
      const routeList = getEmptyRouteCategories(controlsRegion);
      categoryEmpty = routeList[categoryKey];
      break;
    default:
      categoryEmpty = false;
      break;
  }
  return {
    active: controlsCategory === categoryKey,
    displayed: enabled && !categoryEmpty,
    style,
    nameKey,
    // Adding language to the props, even if it isn't used,
    // causes the component to re-render when the language changes.
    lang,
  };
};
const mapDispatchToProps = (dispatch, { categoryKey }) => ({
  enableCategory: () => dispatch(setControlsCategory(categoryKey)),
});
const MapControlsCategoryButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(_MapControlsCategoryButton);

export default MapControlsCategoryButton;