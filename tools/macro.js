// EXCEEDSYSTEM.vscode-macros
const vscode = require('vscode')

module.exports.macroCommands = {
  RemoveFontsInfo: {
    no: 1,
    func: removeFontsInfo,
  }
}

/**
 * remove hardcoded fonts, colors, etc
 */
async function removeFontsInfo() {
  const editor = vscode.window.activeTextEditor

  if (!editor) {
    return 'Editor is not opening.'
  }

  let newText = ''

  newText = editor.document.getText()

  newText = newText
    .replace(/<p style=".*?padding-left: 30px;">/, '')
    .replaceAll(` style="text-align: justify;"`, '')
    .replaceAll(`<span style="font-family: arial, helvetica, sans-serif; font-size: 12pt;">`, '')
    .replaceAll(`class="docssharedWizToggleLabeledPrimaryText"`, '')
    .replaceAll(`font-family: arial, helvetica, sans-serif; `, '')
    .replaceAll(`<span style="font-family: arial, helvetica, sans-serif;">`, '')
    .replace(/<span style="font-size: .*?;">/g, '')
    .replace(/<h3 style="color: .*?;">/g, `<h3>`)
    // .replaceAll(`<span style="font-size: 12pt; font-family: arial, helvetica, sans-serif;">`, '')
    .replaceAll(`<span class="docssharedWizToggleLabeledLabelText exportLabel freebirdFormviewerComponentsQuestionRadioLabel" dir="auto" style="font-size: 12pt;">`, '')
    // .replaceAll(`font-size: 12pt; `, '')
    .replace(/font-family:.*?;/g, '')
    .replace(/font-size:.*?;/g, '')
    .replaceAll(`dir="auto"`, '')
    .replaceAll(`телеграм-сообществ</a>е`, `телеграм-сообществе</a>`)
    .replace(/<span style="color:.*?;\s*?">/g, '')
    .replace(/<a style="color: .*?;"/g, '<a')
    // .replaceAll(`<a style="color: #0000ff;"`, '<a')
    .replaceAll(`docssharedWizToggleLabeledLabelText`, '')
    .replaceAll(`exportLabel`, '')
    .replaceAll(`freebirdFormviewerComponentsQuestionRadioLabel`, '')
    // .replaceAll(`<span style="font-size: 1rem;">`, '')
    // .replaceAll(`<span style="font-size: 12pt;">`, '')
    // <span style="font-size: 10pt;">
    .replace(/<div class=".*?">/g, '')
    .replace(/<p class=".*?">/g, '<p>')
    // <p class="markdown prose w-full break-words dark:prose-invert light">
    .replaceAll(`</div>`, '')
    .replace(/<span class=".*?".\s?>/g, '')
    .replaceAll(`&nbsp;`, ' ')
    .replace(new RegExp(/(^[ \t]*\n)/, "gm"), '\n')
  // .replaceAll(`AAAAAA`, '')
  // .replaceAll(`AAAAAA`, '')
  // .replaceAll(`AAAAAA`, '')

  const firstLine = editor.document.lineAt(0)
  const lastLine = editor.document.lineAt(editor.document.lineCount - 1)
  const fullRange = new vscode.Range(firstLine.range.start, lastLine.range.end)

  editor.edit((edit) => edit.replace(fullRange, newText))

  vscode.env.clipboard.writeText(newText)

  const position = editor.selection.active
  const newPosition = position.with(0, 0)
  editor.selection = new vscode.Selection(newPosition, position);
  vscode.commands.executeCommand("scrollEditorTop")


  if (newText.includes('12pt')) {
    await vscode.window.showInformationMessage('"12pt" still here')
  }

  if (newText.includes('justify')) {
    await vscode.window.showInformationMessage('"justify" still here')
  }

  if (newText.includes('font-size')) {
    await vscode.window.showInformationMessage('"font-size" still here')
  }
}

