const mongoose = require("mongoose");

const Schema = mongoose.Schema; 

const Image = new Schema({
  url: { type: String }
})

// const conversationStatus = new Schema({
//   iucn: {
//     type: String,
//     vietnamese: "Tình trạng bảo tồn theo ICUN",
//     default: 'Không có',
//   },
//   redBook: {
//     type: String,
//     vietnamese: "Tình trạng bảo tồn theo sách đỏ việt ",
//     default: 'Không có',
//   },
//   decree32: {
//     type: String,
//     vietnamese: "Tình trạng bảo tồn theo Nghị định 32 ",
//     default: 'Không có',
//   },
//   cities: {
//     type: String,
//     vietnamese: "Tình trạng bảo tồn theo CITIES",
//     default: 'Không có',
//   },
// });

const Coordinate = new Schema({
  coordinate: { type: String }
})

const Animal = new Schema(
  {
    scienceName: {
      type: String,
      vietnamese: "Tên Khoa Học",
      require: true,
    },
    vietnameseName: {
      type: String,
      vietnamese: "Tên Tiếng Việt",
      require: true,
    },
    localName: {
      type: String,
      vietnamese: "Tên Địa Phương",
      require: true,
    },
    kingdom: {
      type: String,
      vietnamese: "Giới",
      require: true,
    },
    phylum: {
      type: String,
      vietnamese: "Ngành",
      require: true,
    },
    class: {
      type: String,
      vietnamese: "Lớp",
      require: true,
    },
    order: {
      type: String,
      vietnamese: "Bộ",
      require: true,
    },
    family: {
      type: String,
      vietnamese: "Họ",
      require: true,
    },
    media: {
      type: [Image],
      vietnamese: "Image/Video",
      default: []
    },
    ecologicalCharacteristics: {
      type: String,
      vietnamese: "Đặc điểm sinh thái",
      require: true,
    },
    morphologicalCharacteristics: {
      type: String,
      vietnamese: "Đặc điểm hình thái",
      require: true,
    },
    useValue: {
      type: String,
      vietnamese: "Giá trị sử dụng ",
      default: 'Chưa xác định',
    },
    conservationStatus: {
      iucn: {
        type: String,
        vietnamese: "Tình trạng bảo tồn theo ICUN",
        default: 'Không có giá trị bảo tồn',
      },
      redBook: {
        type: String,
        vietnamese: "Tình trạng bảo tồn theo sách đỏ việt ",
        default: 'Không có giá trị bảo tồn',
      },
      decree32: {
        type: String,
        vietnamese: "Tình trạng bảo tồn theo Nghị định 32 ",
        default: 'Không nằm trong danh mục bảo tồn',
      },
      cities: {
        type: String,
        vietnamese: "Tình trạng bảo tồn theo CITIES",
        default: 'Không có trong danh mục',
      },
    },
    distribution: {
      type: String,
      vietnamese: " Phân bố ",
      require: true,
    },
    coordinates: {
      type: [Coordinate],
      vietnamese: " Tọa độ ",
      default: [],
    },
    specimenCondition: {
      type: String,
      vietnamese: " Tình trạng mẫu vật ",
      require: true,
    },
    habitat: {
      type: String,
      vietnamese: "Sinh cảnh ",
      require: true,
    },
    place: {
      type: String,
      vietnamese: " Địa điểm",
      require: true,
    },
    sampleCollectionDate: {
      type: Date,
      vietnamese: "Ngày thu mẫu",
      require: true,
    },
    sampleCollector: {
      type: String,
      vietnamese: " Người thu mẫu ",
      require: true,
    },
    postStatus: {
      type: Number,
      vietnamese: " Trạng thái bài viết ",
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Animal", Animal);
