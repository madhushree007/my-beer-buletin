const reviewUpVoteDbMockRes = {
  like_count: 6,
  _id: '5fbd4336b4c24e042a9afd3b',
  bid: 3,
  user_name: 'Someone',
  review: 'A superb Beer recently tested',
  __v: 0
}

const reviewErrorResponse = {
  status: "fail",
  message: "invalid direction: upd"
}

const reviewPostReqMock = {
  bid: 3,
  user_name: "Someone Else",
  review: "A superb Beer recently tested....Aha!!"
}

const reviewPostResMock = {
  like_count: 0,
  _id: '5fbd4336b4c24e042a9afd3b',
  bid: 3,
  user_name: "Someone Else",
  review: "A superb Beer recently tested....Aha!!",
  __v: 0
}

module.exports = {reviewUpVoteDbMockRes, reviewErrorResponse, reviewPostReqMock, reviewPostResMock}