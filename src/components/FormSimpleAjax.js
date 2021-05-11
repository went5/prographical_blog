import React, { Fragment } from 'react'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'

import './Form.css'

class Form extends React.Component {
  static defaultProps = {
    name: 'Simple Form Ajax',
    subject: '', // optional subject of the notification email
    action: '',
    successMessage: 'お問い合わせありがとうございます。',
    errorMessage: '問題が発生したため、メッセージは送信されません。'
  }

  state = {
    alert: '',
    disabled: false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.disabled) return

    const form = e.target
    const data = serialize(form)
    this.setState({ disabled: true })
    fetch(form.action + '?' + stringify(data), {
      method: 'POST'
    })
      .then((res) => {
        if (res.ok) {
          return res
        } else {
          throw new Error('Network error')
        }
      })
      .then(() => {
        form.reset()
        this.setState({
          alert: this.props.successMessage,
          disabled: false
        })
      })
      .catch((err) => {
        console.error(err)
        this.setState({
          disabled: false,
          alert: this.props.errorMessage
        })
      })
  }

  render() {
    const { name, subject, action } = this.props

    return (
      <Fragment>
        <form
          className="Form"
          name={name}
          action={action}
          onSubmit={this.handleSubmit}
          data-netlify="true"
        >
          {this.state.alert && (
            <div className="Form--Alert">{this.state.alert}</div>
          )}
          <div className="Form--Group">
            <label className="Form--Label" htmlFor="ni">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="名前"
                name="名前"
                aria-label="名前入力"
                id="ni"
                required
              />
              <span>お名前</span>
            </label>
            <label className="Form--Label" htmlFor="mi">
              <input
                className="Form--Input Form--InputText"
                type="email"
                placeholder="メールアドレス"
                name="メールアドレス"
                aria-label="メールアドレス入力"
                id="mi"
                required
              />
              <span>メールアドレス</span>
            </label>
            <label className="Form--Label" htmlFor="qi">
              <textarea
                className="Form--Input Form--Textarea Form--InputText"
                placeholder="お問い合わせ内容"
                name="message"
                rows="10"
                aria-label="お問い合わせ内容"
                id="qi"
                required
              />
              <span>お問い合わせ内容</span>
            </label>
            {!!subject && (
              <input
                type="hidden"
                name="subject"
                value={subject}
                aria-label="hide"
              />
            )}
            <input
              type="hidden"
              name="form-name"
              value={name}
              aria-label="hide"
            />
            <br />
            <input
              className="Form--SubmitButton Form--Button recaptcha"
              type="submit"
              value="送信する"
              aria-label="送信"
              disabled={this.state.disabled}
            />
          </div>
        </form>
      </Fragment>
    )
  }
}

export default Form
