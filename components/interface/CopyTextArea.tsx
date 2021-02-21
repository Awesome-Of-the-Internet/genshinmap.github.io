/**
 * Provides text area which you can click to copy the contents of.
 * Includes tooltip text.
 */
import { TextField, Tooltip } from '@material-ui/core';
import React, { ReactElement } from 'react';

import { t } from 'components/i18n/Localization';

/**
 * A text area which you can click to copy the contents of.
 *
 * @param {*} text The text to display in the textarea.
 * @param {*} others Any other parameters passed will be received by the text area.
 */
const CopyTextArea = ({
  text,
  rows = 10,
  ...others
}: {
  text: string;
  rows: number;
}): ReactElement => {
  const copyText = (event) => {
    event.target.select();
    document.execCommand('copy');
  };

  return (
    <>
      <Tooltip title={t('popup-click-to-copy')}>
        <TextField
          fullWidth
          multiline
          InputProps={{
            readOnly: true,
          }}
          inputProps={{ style: { cursor: 'pointer' } }}
          onClick={copyText}
          rows={rows}
          value={text}
          {...others}
        />
      </Tooltip>
    </>
  );
};

export default CopyTextArea;
