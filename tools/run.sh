inline-email -f $1 --out inlined.html && html-minifier --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype --minify-css true --minify-js true inlined.html > inlined.min.html && pbcopy < inlined.min.html