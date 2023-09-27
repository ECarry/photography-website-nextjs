import EXIF from 'exif-js';
import parseGPSCoordinate from './parseGPSCoordinate';

const getImageExifInfo = async (imageUrl: string) => {
  return new Promise((resolve, reject) => {
    try {
      fetch(imageUrl, { method: 'GET' })
        .then((response) => {
          if (!response.ok) {
            throw new Error('获取图片失败');
          }
          return response.blob();
        })
        .then((blob) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const arrayBuffer = event.target?.result as ArrayBuffer;
            const exifData = EXIF.readFromBinaryFile(arrayBuffer);

            const cameraMake = exifData.Make || null;
            const cameraModel = exifData.Model || null;
            const cameraLens = exifData.undefined || null;
            const timestamp = exifData.DateTime || null;

            const latitude = () => {
              if (!exifData.GPSLatitude) return null;

              const lat = {
                ref: exifData.GPSLatitudeRef,
                values: exifData.GPSLatitude,
              };

              const data = parseGPSCoordinate(lat)

              return String(data)
            }

            const longitude = () => {
              if (!exifData.GPSLatitude) return null;

              const lon = {
                ref: exifData.GPSLongitudeRef,
                values: exifData.GPSLongitude,
              };

              const data = parseGPSCoordinate(lon)

              return String(data)
            }

            const gpsAltitude = () => {
              if (!exifData.GPSAltitude) return null;

              const data = exifData.GPSAltitude.numerator / exifData.GPSAltitude.denominator

              return String(data)
            }

            const iso = () => {
              if (!exifData.ISOSpeedRatings) return null;

              return String(exifData.ISOSpeedRatings)
            }
            
            const shutterSpeed = () => {
              if (!exifData.ExposureTime) return null;

              return exifData.ExposureTime.denominator === 1 
                      ? exifData.ExposureTime.numerator 
                      : exifData.ExposureTime.numerator+ '/' + exifData.ExposureTime.denominator
            }
          
            const focalLength = () => {
              if (!exifData.FocalLengthIn35mmFilm) return null;

              return String(exifData.FocalLengthIn35mmFilm)
            }
            const fNumber = () => {
              if (!exifData.FNumber) return null;

              const data = exifData.FNumber.denominator === 1 
                      ? exifData.FNumber.numerator 
                      : exifData.FNumber.numerator/exifData.FNumber.denominator

              return String(data)
            }

            const exif = {
              'cameraMake': cameraMake,
              'cameraModel': cameraModel,
              'cameraLens': cameraLens,
              'timestamp': timestamp,
              'latitude': latitude(),
              'longitude': longitude(),
              'gpsAltitude': gpsAltitude(),
              'shutterSpeed': shutterSpeed(),
              'fNumber': fNumber(),
              'iso': iso(),
              'focalLength': focalLength(),
            }
            
            resolve(exif); // 解析的 EXIF 数据通过 resolve 返回
          };
          reader.readAsArrayBuffer(blob);
        })
        .catch((error) => {
          reject(error); // 如果出现错误，通过 reject 返回错误信息
        });
    } catch (error) {
      reject(error); // 如果出现异常，也通过 reject 返回错误信息
    }
  });
};

export default getImageExifInfo;