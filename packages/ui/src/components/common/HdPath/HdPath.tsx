import { Blockchains, blockchains } from '@emeraldwallet/core';
import { MenuItem, Paper, TextField } from '@material-ui/core';
import { CSSProperties, withStyles } from '@material-ui/styles';
import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';

interface IDPath {
  value: string;
  label: string;
}

const dPaths: IDPath[] = Object.keys(blockchains.Blockchains)
  .map<IDPath>((chainCode: string) => ({
    value: Blockchains[chainCode].params.hdPath,
    label: Blockchains[chainCode].getTitle()
  }));

export const styles = (theme?: any) => ({
  container: {
    position: 'relative'
  } as CSSProperties,
  suggestionsContainer: {
    border: 'none'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
    border: `1px solid ${theme.palette && theme.palette.divider}`
  } as CSSProperties,
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  },
  suggestion: {
    display: 'block'
  },
  suggestionLabel: {
    color: theme.pallete && theme.pallete.text.secondary
  }
});

const predefinedHdPaths = dPaths;

interface IProps {
  onChange?: any;
  value?: string;
  classes?: any;
}

interface IState {
  value?: any;
  suggestions?: any;
}

function renderInputComponent (inputProps) {
  const { classes, inputRef = () => {}, ref, endAdornment, ...other } = inputProps;

  return (
    <TextField
      fullWidth={true}
      InputProps={{
        inputRef: (node) => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input
        },
        endAdornment
      }}
      {...other}
    />
  );
}

function renderSuggestion (suggestion, { query, isHighlighted }) {
  return (
    <MenuItem selected={isHighlighted} component='div'>
      <div>
        {suggestion.value} {suggestion.label}
      </div>
    </MenuItem>
  );
}

export class HdPath extends React.Component<IProps, IState> {
  public state = {
    suggestion: [],
    value: this.props.value
  };

  public handleChange = (event, { newValue }) => {
    if (this.props.onChange && this.state.value !== newValue) {
      this.props.onChange(newValue);
    }
    this.setState({
      value: newValue
    });
  }

  public handleSuggestionsFetchRequested = ({ value }) => {
    // We ignore input value and show all possible suggestions
    this.setState({
      suggestions: predefinedHdPaths
    });
  }

  public handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  }

  public shouldRenderSuggestions (value: string): boolean {
    return true;
  }

  public render () {
    const { value, classes } = this.props;
    return (
      <div className={classes.container}>
        <Autosuggest
          shouldRenderSuggestions={this.shouldRenderSuggestions}
          renderInputComponent={renderInputComponent}
          suggestions={predefinedHdPaths}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
          getSuggestionValue={(suggestion) => (suggestion.value)}
          renderSuggestion={renderSuggestion}
          inputProps={{
            classes,
            placeholder: "m/44'/60'/160720'/0'",
            value: this.state.value,
            onChange: this.handleChange
          }}
          theme={{
            container: classes.container,
            suggestionsContainer: classes.suggestionsContainer,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion
          }}
          renderSuggestionsContainer={(options) => (
            <Paper {...options.containerProps} square={true}>
              {options.children}
            </Paper>
          )}
        />
      </div>
    );
  }
}

export default withStyles(styles)(HdPath);
