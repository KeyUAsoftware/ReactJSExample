/**
 * @class RadioSelect
 * @classdesc A radio group selection field that can also add options in an intelligent way.
 */
var RadioSelect = {
    propTypes: {
        data: React.PropTypes.array.isRequired,
        dataValueAttr: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        dataDescAttr: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        optionClassName: React.PropTypes.string,
        optionRenderer: React.PropTypes.func,
        optionWrapper: React.PropTypes.func,
        keyFunction: React.PropTypes.func,
        labelClassName: React.PropTypes.string
    },
    /**
     * Returns the list of additional properties for this subclass.
     *
     * @returns {Array} The list of additional properties.
     */
    getAdditionalProps: function () {
        return ['data', 'dataValueAttr', 'dataDescAttr', 'value',
            'optionClassName', 'optionWrapper', 'optionRenderer',
            'labelClassName', 'keyFunction', 'disabled'
        ];
    },
    /**
     * The main rendering method.
     *
     * @method
     * @instance
     * @param {Array} data - The list of options to be rendered as selectable.
     * @param {Object} props - The main properties for the component.
     * @param {Object} options - The non-standard (custom) properties for the component.
     * @returns {Object} The rendered React component instance.
     */
    _render: function (data, props, options) {
        var keyFunction = options.keyFunction;
        var optionWrapper = options.optionWrapper || function (comp) {
            return comp;
        };
        // rendering part here
        var entryDef;
        var optionRenderer = options.optionRenderer || function (idx, Radio, entry, options) {
            var optionClassName = options.optionClassName || ''; // col-md-2
            var labelClassName = options.labelClassName || ''; // radio-inline
            var val = 'value' in entry ? entry.value : '';
            return (
                <label key={idx} className={labelClassName}>
                    <Radio className={optionClassName} disabled={options.disabled} value={val} />{entry.description}
                </label>
            );
        };
        return (
            <RadioGroup selectedValue={options.value} disabled={options.disabled} {...props}>
            {data.map(function(entry, idx) {
                idx = keyFunction ? keyFunction(entry, idx) : idx;
                entryDef = getValueAndDescription(entry, options.dataValueAttr, options.dataDescAttr);
                return optionWrapper(
                    optionRenderer(idx, Radio, entryDef, options), idx
                );
             })}
            </RadioGroup>
        );
    }
};
RadioSelect = React.createClass(
    extendClass(RadioSelect, [BaseSelect]));