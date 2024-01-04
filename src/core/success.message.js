'use strict'

const statusCode = {
  OK: 200,
  CREATED: 201
}

const reasonStatusCode = {
  OK: 'Success',
  CREATED: 'Created'
}

class SuccessResponse {
  constructor ({
    message,
    status = statusCode.OK,
    reasonStatus = reasonStatusCode.OK,
    metadata = {}
  }) {
    this.message = !message ? reasonStatus : message
    this.status = status
    this.metadata = metadata
  }

  send (res, headers = {}) {
    return res.status(this.status).json(this)
  }
}

class OK extends SuccessResponse {
  constructor ({ message, metadata }) {
    super({ message, metadata })
  }
}

class CREATED extends SuccessResponse {
  constructor ({
    message,
    status = statusCode.CREATED,
    reasonStatus = reasonStatusCode.CREATED,
    metadata = {},
    options = {}
  }) {
    super ({
      message,
      status,
      reasonStatus,
      metadata,
    })

    this.options = options
  }
}

module.exports = {
  OK,
  CREATED,
  SuccessResponse
}
