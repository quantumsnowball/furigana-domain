import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DEFAULT_CONTENT, DEFAULT_CONTENT_DATA } from '../../constants/content'
import { ChineseItem, Content, EnglishItem, FuriganaItem, RomajiItem, SourceItem } from '../../types/content'


const contentSlice = createSlice({
  name: 'content',
  initialState: DEFAULT_CONTENT,
  reducers: {
    setTitle: (s, a: PayloadAction<string>) => {
      s.title = a.payload
    },
    setContent: (s, a: PayloadAction<Content>) => {
      s.title = a.payload.title
      s.items = a.payload.items
    },
    addContent: (s, a: PayloadAction<{ uuid: string }>) => {
      s.items.push({ uuid: a.payload.uuid, ...DEFAULT_CONTENT_DATA })
    },
    clearContent: s => {
      s.items = []
    },
    setSource: (s, a: PayloadAction<SourceItem>) => {
      s.items[a.payload.i].source = a.payload.val
    },
    setFurigana: (s, a: PayloadAction<FuriganaItem>) => {
      s.items[a.payload.i].furigana = a.payload.val
    },
    setRomaji: (s, a: PayloadAction<RomajiItem>) => {
      s.items[a.payload.i].romaji = a.payload.val
    },
    setEnglish: (s, a: PayloadAction<EnglishItem>) => {
      s.items[a.payload.i].english = a.payload.val
    },
    setChinese: (s, a: PayloadAction<ChineseItem>) => {
      s.items[a.payload.i].chinese = a.payload.val
    },
  }
})

export const contentActions = contentSlice.actions

export const contentReducer = contentSlice.reducer

